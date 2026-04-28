export default function LeadsTable({ leads, location, profession }) {
  const getValidUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://${url}`;
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 bg-white border rounded-2xl shadow overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">{leads.length} Leads Found</h2>
          <p className="text-sm text-gray-500">
            {profession} in {location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
            Excel
          </button>
          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
            CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Reviews</th>
              <th className="p-3 text-left">Website</th>
              <th className="p-3 text-left">Pitched</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Remark</th>
              <th className="p-3 text-left">Converted</th>
            </tr>
          </thead>

          <tbody>
            {leads.length > 0 ? (
              leads.map((lead, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>

                  {/* Name + Address */}
                  <td className="p-3">
                    <p className="font-medium">{lead.name || "-"}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {lead.address || "-"}
                    </p>
                  </td>

                  <td className="p-3">{lead.phone || "-"}</td>

                  <td className="p-3">{lead.reviews || "N/A"}</td>

                  <td className="p-3">
                    {lead.website ? (
                      <a
                        href={getValidUrl(lead.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      <span className="text-gray-400">No site</span>
                    )}
                  </td>

                  {/* CRM fields */}
                  <td className="p-3">
                    <input type="checkbox" className="cursor-pointer" />
                  </td>

                  <td className="p-3">
                    <input
                      type="date"
                      className="border rounded px-2 py-1 text-xs"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="text"
                      placeholder="Remark"
                      className="border rounded px-2 py-1 text-xs w-28"
                    />
                  </td>
                  <td className="p-3">
                    <input type="checkbox" className="cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
