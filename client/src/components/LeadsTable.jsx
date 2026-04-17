export default function LeadsTable({ leads, location, profession }) {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white border rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">{leads.length} leads found</h2>
          <p className="text-sm text-gray-500">
            {profession} in {location}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Excel
          </button>
          <button className="border px-4 py-2 rounded">CSV download</button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Website</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">{lead.name}</td>
              <td className="p-3">{lead.address}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3 text-yellow-500">⭐ {lead.rating}</td>
              <td className="p-3">
                {lead.website ? (
                  <a href={`https://${lead.website}`} className="text-blue-500">
                    {lead.website}
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
