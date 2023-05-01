const li = (classes, list, i, c) => (
  <li index={i} key={i} className={classes}>
    <div index={i} className="d-flex justify-content-between">
      <span index={i}> {list}</span>
      <span index={i}>{c}</span>
    </div>
  </li>
)

export default li
