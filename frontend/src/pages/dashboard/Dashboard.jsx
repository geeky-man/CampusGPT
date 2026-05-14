function Dashboard() {

  return (

    <div className="p-10">

      <h1 className="text-5xl font-bold text-blue-400 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">

          <h2 className="text-xl text-slate-400 mb-3">
            Uploaded Documents
          </h2>

          <p className="text-5xl font-bold">
            12
          </p>

        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">

          <h2 className="text-xl text-slate-400 mb-3">
            Questions Asked
          </h2>

          <p className="text-5xl font-bold">
            58
          </p>

        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">

          <h2 className="text-xl text-slate-400 mb-3">
            Active Users
          </h2>

          <p className="text-5xl font-bold">
            24
          </p>

        </div>

      </div>

    </div>
  )
}

export default Dashboard