import React from "react";
import { Clock } from "lucide-react";

function LeftPanel() {
  const cellData = {
    RBC: [
      { name: "Angled Cells", count: 222, percentage: "67%" },
      { name: "Borderline Ovalacytes", count: 50, percentage: "20%" },
      { name: "Burr Cells", count: 87, percentage: "34%" },
      { name: "Fragmented Cells", count: 2, percentage: "0.12%" },
      { name: "Ovalacytes", count: "", percentage: "" },
      { name: "Rounded RBC", count: "", percentage: "" },
      { name: "Teardrops", count: "", percentage: "" },
    ],
    WBC: [
      { name: "Basophil", count: 222, percentage: "67%" },
      { name: "Eosinophil", count: 50, percentage: "20%" },
      { name: "Lymphocyte", count: 87, percentage: "34%" },
      { name: "Monocyte", count: 2, percentage: "0.12%" },
    ],
    Platelets: [
      { name: "Count", count: 222 },
      { name: "Percentage", count: 222 },
    ],
  };

  return (
    <div className="h-full p-6 bg-white shadow-md rounded-lg overflow-y-auto">
      <div className="mb-6 flex items-center bg-gray-100 p-3 rounded-md">
        <Clock className="w-5 h-5 text-gray-500 mr-2" />
        <div>
          <div className="text-xs text-gray-500">Last Updated</div>
          <div className="font-medium text-gray-700">
            Mon Oct 07 2024 16:39:07
          </div>
        </div>
      </div>

      <div className="mb-6">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="border border-gray-300 px-4 py-2 text-left">
                🩸 RBC
              </th>
              <th className="border border-gray-300 px-4 py-2">Count</th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {cellData.RBC.map((item, index) => (
              <tr
                key={index}
                className="border border-gray-300 odd:bg-gray-50 hover:bg-gray-200 transition"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.count}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="border border-gray-300 px-4 py-2 text-left">
                ⚪ WBC
              </th>
              <th className="border border-gray-300 px-4 py-2">Count</th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {cellData.WBC.map((item, index) => (
              <tr
                key={index}
                className="border border-gray-300 odd:bg-gray-50 hover:bg-gray-200 transition"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.count}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-yellow-100 text-yellow-900">
              <th
                className="border border-gray-300 px-4 py-2 text-center"
                colSpan="2"
              >
                🏥 Platelets
              </th>
            </tr>
          </thead>
          <tbody>
            {cellData.Platelets.map((item, index) => (
              <tr
                key={index}
                className="border border-gray-300 odd:bg-gray-50 hover:bg-gray-200 transition"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeftPanel;
