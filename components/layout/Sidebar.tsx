export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="font-semibold">
          Incident Assistant
        </h1>
      </div>

      <nav className="p-4">
        <a
          href="/"
          className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Dashboard
        </a>

        <a
          href="/incidents"
          className="mt-1 block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Incidents
        </a>
      </nav>
    </aside>
  );
}