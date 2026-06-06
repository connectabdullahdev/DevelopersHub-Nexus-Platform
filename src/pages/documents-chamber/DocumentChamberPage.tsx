import { useState } from 'react';
import { Upload, FileText, Eye, PenTool, CheckCircle, Clock, Edit } from 'lucide-react';

const DocumentChamberPage = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Investment Agreement.pdf', status: 'Signed', date: '2026-06-01', size: '2.4 MB' },
    { id: 2, name: 'Term Sheet Q2.pdf', status: 'In Review', date: '2026-06-03', size: '1.1 MB' },
    { id: 3, name: 'NDA Draft.pdf', status: 'Draft', date: '2026-06-04', size: '0.8 MB' },
  ]);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleUpload = () => {
    const newDoc = {
      id: documents.length + 1,
      name: `New Document ${documents.length + 1}.pdf`,
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      size: '1.0 MB'
    };
    setDocuments([...documents, newDoc]);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Signed') return 'bg-green-100 text-green-700';
    if (status === 'In Review') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Signed') return <CheckCircle size={14} />;
    if (status === 'In Review') return <Clock size={14} />;
    return <Edit size={14} />;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Document Chamber</h1>
      <p className="text-gray-500 mb-6">Manage your deals, contracts and agreements</p>

      <div className="grid grid-cols-3 gap-6">
        {/* Left - Document List */}
        <div className="col-span-2 space-y-4">
          {/* Upload Area */}
          <div
            onClick={handleUpload}
            className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:bg-blue-50 transition bg-white"
          >
            <Upload size={36} className="mx-auto text-blue-400 mb-3" />
            <p className="font-semibold text-gray-700">Click to upload document</p>
            <p className="text-sm text-gray-400 mt-1">PDF, DOC, DOCX supported</p>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-700">All Documents</h3>
            </div>
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-400">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    {doc.status}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Eye size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - E-Signature */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <PenTool size={18} className="text-blue-500" />
              E-Signature
            </h3>
            <p className="text-sm text-gray-500 mb-4">Sign your document digitally</p>

            {!signed ? (
              <>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl h-36 flex items-center justify-center mb-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setSigning(true)}
                >
                  {signing ? (
                    <p className="text-blue-600 font-medium text-sm">✍️ Signing...</p>
                  ) : (
                    <p className="text-gray-400 text-sm">Click to sign here</p>
                  )}
                </div>
                <button
                  onClick={() => { setSigning(false); setSigned(true); }}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Apply Signature
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-green-600">Document Signed!</p>
                <p className="text-xs text-gray-400 mt-1">Signature applied successfully</p>
                <button
                  onClick={() => setSigned(false)}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  Sign another
                </button>
              </div>
            )}
          </div>

          {/* Status Summary */}
          <div className="bg-white rounded-xl shadow p-5 mt-4">
            <h3 className="font-semibold text-gray-700 mb-4">Status Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Signed</span>
                <span className="font-semibold text-green-600">{documents.filter(d => d.status === 'Signed').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Clock size={14} className="text-yellow-500" /> In Review</span>
                <span className="font-semibold text-yellow-600">{documents.filter(d => d.status === 'In Review').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Edit size={14} className="text-gray-500" /> Draft</span>
                <span className="font-semibold text-gray-600">{documents.filter(d => d.status === 'Draft').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentChamberPage;