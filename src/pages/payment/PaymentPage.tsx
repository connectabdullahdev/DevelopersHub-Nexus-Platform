import { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, TrendingUp } from 'lucide-react';

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('deposit');

  const transactions = [
    { id: 1, type: 'deposit', sender: 'Michael Rodriguez', receiver: 'Sarah Johnson', amount: 50000, status: 'Completed', date: '2026-06-01' },
    { id: 2, type: 'transfer', sender: 'Sarah Johnson', receiver: 'TechWave AI', amount: 12000, status: 'Completed', date: '2026-06-02' },
    { id: 3, type: 'withdraw', sender: 'Sarah Johnson', receiver: 'Bank Account', amount: 5000, status: 'Pending', date: '2026-06-03' },
    { id: 4, type: 'deposit', sender: 'Jennifer Lee', receiver: 'Sarah Johnson', amount: 25000, status: 'Completed', date: '2026-06-04' },
    { id: 5, type: 'transfer', sender: 'Sarah Johnson', receiver: 'Robert Torres', amount: 8000, status: 'Failed', date: '2026-06-04' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-700';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'deposit') return <ArrowDownLeft size={16} className="text-green-500" />;
    if (type === 'withdraw') return <ArrowUpRight size={16} className="text-red-500" />;
    return <ArrowLeftRight size={16} className="text-blue-500" />;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Payment Center</h1>
      <p className="text-gray-500 mb-6">Manage your investments and transactions</p>

      {/* Wallet Balance */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <p className="text-blue-200 text-sm mb-1">Wallet Balance</p>
          <h2 className="text-4xl font-bold mb-4">$58,000.00</h2>
          <div className="flex gap-3">
            <button
              onClick={() => { setActiveTab('transfer'); setAction('deposit'); }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
            >
              + Deposit
            </button>
            <button
              onClick={() => { setActiveTab('transfer'); setAction('withdraw'); }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-400 transition"
            >
              Withdraw
            </button>
            <button
              onClick={() => { setActiveTab('transfer'); setAction('transfer'); }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-400 transition"
            >
              Transfer
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-gray-800">$75,000</p>
          <p className="text-green-500 text-xs mt-1 flex items-center gap-1"><TrendingUp size={12} /> +12.5%</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm mb-1">Total Returns</p>
          <p className="text-2xl font-bold text-gray-800">$8,500</p>
          <p className="text-green-500 text-xs mt-1 flex items-center gap-1"><TrendingUp size={12} /> +8.2%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {['overview', 'transfer', 'fund-deal'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {tab === 'overview' ? 'Transactions' : tab === 'transfer' ? 'Deposit/Withdraw' : 'Fund a Deal'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Sender</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Receiver</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <span className="flex items-center gap-2 capitalize text-sm">{getTypeIcon(tx.type)}{tx.type}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{tx.sender}</td>
                  <td className="p-4 text-sm text-gray-600">{tx.receiver}</td>
                  <td className="p-4 text-sm font-semibold">${tx.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>{tx.status}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'transfer' && (
        <div className="bg-white rounded-xl shadow p-6 max-w-md">
          <h3 className="font-semibold text-gray-700 mb-4">
            {action === 'deposit' ? '+ Deposit Funds' : action === 'withdraw' ? 'Withdraw Funds' : 'Transfer Funds'}
          </h3>
          <div className="flex gap-2 mb-4">
            {['deposit', 'withdraw', 'transfer'].map(a => (
              <button
                key={a}
                onClick={() => setAction(a)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition ${action === a ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              />
            </div>
          </div>
          {action === 'transfer' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400">
                <option>Michael Rodriguez</option>
                <option>Jennifer Lee</option>
                <option>Robert Torres</option>
              </select>
            </div>
          )}
          <button
            onClick={() => { alert(`${action} of $${amount} submitted!`); setAmount(''); }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        </div>
      )}

      {activeTab === 'fund-deal' && (
        <div className="bg-white rounded-xl shadow p-6 max-w-md">
          <h3 className="font-semibold text-gray-700 mb-4">Fund a Deal</h3>
          <p className="text-sm text-gray-500 mb-4">Investor → Entrepreneur funding simulation</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Startup</label>
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400">
              <option>TechWave AI — Series A</option>
              <option>GreenEnergy Co — Seed</option>
              <option>HealthTech Plus — Series B</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-blue-700">
            💡 This is a simulation — no real money is transferred
          </div>
          <button
            onClick={() => alert('Deal funded successfully! (Simulation)')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Fund This Deal
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;