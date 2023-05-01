import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import translate from 'translate'
import SideBar from './components/sidebar/Sidebar'
import './App.css'
import FlashCard from './components/word/Word'
import { Popup } from './components/popup/Popup'

function App() {
  let downloaded = false
  const [rawData, setRawData] = useState([])
  const [listToRender, setListToRender] = useState(rawData)
  const [title, setTitle] = useState()
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(10)
  const [wordToAdd, setWordToAdd] = useState(-1)
  const [sidebarOpen, setSideBarOpen] = useState(false)
  const [modalOn, setModalOn] = useState(false)

  translate.engine = 'google'
  const API_URL =
    'https://random-word-api.herokuapp.com/word?number=' + count + '&lang=de'

  useEffect(() => {
    downloadData(API_URL)
  }, [count])

  const downloadData = (link) => {
    fetch(link)
      .then((res) => res.json())
      .then((raw) => {
        translateData(raw)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const translateData = (raw) => {
    translate(raw, { from: 'de', to: 'en' })
      .then((translated) => {
        if (!downloaded) {
          downloaded = true
          for (let i = 0; i < raw.length; i++) {
            rawData.push({ raw: raw[i], translated: translated.split(',')[i] })
          }
          setLoading(false)
          setRawData(rawData)
          setListToRender(rawData)
          const newDataLists = data
          newDataLists[0] = {
            name: 'GENERATED',
            data: rawData,
          }
          setDataLists(newDataLists)
        }
      })
      .catch((e) => console.log(e))
  }

  const updateCount = function (c) {
    setRawData([])
    setLoading(true)
    setCount(c)
  }

  const updateFlashcard = (title, i) => {
    setTitle(title)
    setListToRender(data[i]['data'])
  }

  const toggleSidebar = () => {
    setSideBarOpen(!sidebarOpen)
  }

  const addWord = (i) => {
    setModalOn(true)
    setWordToAdd(i)
  }

  const onListSelected = (listIndex, isNewList, newTitle) => {
    const newDataLists = data

    if (isNewList) {
      const newList = {
        name: newTitle,
        data: [listToRender[wordToAdd]],
      }
      newDataLists.push(newList)
    } else {
      const newList = data[listIndex]['data']
      newList.push(listToRender[wordToAdd])

      newDataLists[listIndex] = {
        name: data[listIndex]['name'],
        data: newList,
      }
    }
    setDataLists(newDataLists)
    closePopup()
  }

  const closePopup = () => setModalOn(false)

  const [data, setDataLists] = useState([
    {
      name: 'GENERATED',
      data: rawData,
    },
  ])

  return loading ? (
    <p>Loading..</p>
  ) : (
    <div className="text-center">
      <SideBar
        key={JSON.stringify(data)}
        updateCount={updateCount}
        updateFlashcard={updateFlashcard}
        count={listToRender.length}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        lists={data.map((i) => i['name'])}
        counts={data.map((i) => i['data'].length)}
      />

      <FlashCard
        key={JSON.stringify(listToRender)}
        listToRender={listToRender}
        initialIndex={0}
        title={title}
        isMainList={listToRender == rawData}
        addWord={addWord}
      />

      {modalOn ? (
        <Popup
          text="choose list"
          closePopup={closePopup}
          lists={data.map((l) => l['name'])}
          onSelected={onListSelected}
        />
      ) : null}
    </div>
  )
}

export default App
