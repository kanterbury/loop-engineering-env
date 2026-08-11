import './App.css'

function App() {
  return (
    <main className="app">
      <h1>Loop Engineering Env</h1>
      <p className="lead">
        検証ループの基準点。ここから AI が自走してアプリを構築します。
      </p>
      <ol className="steps">
        <li>
          <code>docs/SPEC.md</code> に作りたいアプリを書く
        </li>
        <li>
          <code>/loop-plan</code> で backlog を生成する
        </li>
        <li>
          <code>/loop /loop-iterate</code> で自走を開始する
        </li>
      </ol>
    </main>
  )
}

export default App
