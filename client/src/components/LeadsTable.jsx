import { Download, ExternalLink, Map, Globe, CheckCircle2, Calendar, MessageSquare, Star } from "lucide-react";
import * as XLSX from "xlsx";

export default function LeadsTable({ leads, location, profession, limit }) {
  const getValidUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://${url}`;
  };

  const exportToExcel = () => {
    const exportData = leads.map((lead) => ({
      name: lead.name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      link: lead.link || "",
      rating: lead.rating || "",
      reviews: lead.reviews || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    worksheet["!cols"] = [
      { wch: 35 },
      { wch: 18 },
      { wch: 20 },
      { wch: 50 },
      { wch: 10 },
      { wch: 10 },
    ];

    const filename = `${profession}_in_${location}_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const exportToCsv = () => {
    const exportData = leads.map((lead) => ({
      name: lead.name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      link: lead.link || "",
      rating: lead.rating || "",
      reviews: lead.reviews || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profession}_in_${location}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-12 bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 p-6 border-b border-slate-100 bg-slate-50/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-bold text-2xl text-slate-900 tracking-tight">
              {leads.length} Leads Discovered
            </h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Real-time
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            <span className="text-slate-900 font-semibold">{profession}</span> in <span className="text-slate-900 font-semibold">{location}</span> · showing up to {limit} results
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={exportToExcel}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 text-sm font-semibold transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            <Download size={18} className="text-blue-400" />
            Export XLSX
          </button>
          <button
            onClick={exportToCsv}
            className="inline-flex items-center gap-2 border-2 border-slate-200 bg-white text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 text-sm font-semibold transition-all active:scale-95"
          >
            <Download size={18} className="text-slate-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <th className="px-4 py-4 font-bold uppercase tracking-wider text-[11px]">#</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">Business Details</th>
              <th className="px-4 py-4 font-bold uppercase tracking-wider text-[11px]">Contact</th>
              <th className="px-4 py-4 font-bold uppercase tracking-wider text-[11px]">Email</th>
              <th className="px-4 py-4 font-bold uppercase tracking-wider text-[11px]">Reputation</th>
              <th className="px-4 py-4 font-bold uppercase tracking-wider text-[11px]">Links</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leads.length > 0 ? (
              leads.map((lead, index) => (
                <tr
                  key={index}
                  className="group hover:bg-blue-50/30 transition-colors duration-200"
                >
                  <td className="px-4 py-5 text-slate-400 font-mono text-xs">{index + 1}</td>

                  {/* Business Details */}
                  <td className="px-6 py-5 max-w-xs">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                        {lead.name || "Unnamed Business"}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {lead.address || "No address provided"}
                      </p>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-900 font-semibold text-sm">
                        {lead.phone || "No phone"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        Direct Line
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-900 font-medium text-sm break-all max-w-[150px]">
                        {lead.email || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Reputation */}
                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1 w-fit border border-amber-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-700">
                          {typeof lead.rating === 'number' ? lead.rating.toFixed(1) : lead.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                        <MessageSquare className="w-3 h-3" />
                        {lead.reviews || 0} reviews
                      </div>
                    </div>
                  </td>

                  {/* Links */}
                  <td className="px-4 py-5">
                    <div className="flex gap-2">
                      {lead.link ? (
                        <a
                          href={getValidUrl(lead.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all"
                          title="View on Google Maps"
                        >
                          <Map size={18} />
                        </a>
                      ) : (
                        <div className="p-2 bg-slate-50 text-slate-300 rounded-lg cursor-not-allowed">
                          <Map size={18} />
                        </div>
                      )}
                      {lead.website ? (
                        <a
                          href={getValidUrl(lead.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all"
                          title="Visit Website"
                        >
                          <Globe size={18} />
                        </a>
                      ) : (
                        <div className="p-2 bg-slate-50 text-slate-300 rounded-lg cursor-not-allowed">
                          <Globe size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-20 text-slate-400">
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-slate-50 p-4 rounded-full">
                      <Globe className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="font-medium">No results to display</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
