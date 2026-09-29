export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold">
          AI Developer Incident Assistant
        </h2>
      </div>

      <div className="text-sm text-gray-500">
        Developer Workspace
      </div>
    </header>
  );
}