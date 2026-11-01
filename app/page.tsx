const Home = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl font-bold">notes app</h2>
      <p>
        An example app for{" "}
        <a
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
          className="text-blue-600 hover:underline"
        >
          Full Stack Open Next.js
        </a>
      </p>
      <p>
        See{" "}
        <a
          href="https://github.com/fullstack-hy2020/nextjs-notes"
          className="text-blue-600 hover:underline"
        >
          github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </p>
    </div>
  )
}

export default Home