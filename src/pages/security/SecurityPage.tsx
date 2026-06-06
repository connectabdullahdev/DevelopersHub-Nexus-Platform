import { useState } from 'react';
import { Shield, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const SecurityPage = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otpStep, setOtpStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [role, setRole] = useState('entrepreneur');

  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthTextColors = ['', 'text-red-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];

  const handleOtp = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Security Center</h1>
      <p className="text-gray-500 mb-6">Manage your account security and access controls</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Password Strength */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-blue-500" />
            Password Strength Meter
          </h3>
          <div className="relative mb-4">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg pr-10 outline-none focus:border-blue-400 text-sm"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {password.length > 0 && (
            <>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <p className={`text-sm font-medium mb-3 ${strengthTextColors[strength]}`}>
                {strengthLabels[strength]}
              </p>
            </>
          )}

          <div className="space-y-2 mt-2">
            {[
              { label: 'At least 8 characters', check: password.length >= 8 },
              { label: 'Uppercase letter', check: /[A-Z]/.test(password) },
              { label: 'Number', check: /[0-9]/.test(password) },
              { label: 'Special character', check: /[^A-Za-z0-9]/.test(password) },
            ].map((rule, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {rule.check
                  ? <CheckCircle size={16} className="text-green-500" />
                  : <XCircle size={16} className="text-gray-300" />}
                <span className={rule.check ? 'text-green-600' : 'text-gray-400'}>{rule.label}</span>
              </div>
            ))}
          </div>

          {strength === 4 && (
            <button className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
              Update Password
            </button>
          )}
        </div>

        {/* 2FA */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-green-500" />
            Two-Factor Authentication
          </h3>

          {otpStep === 1 && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-700 font-medium">Step 1: Verify your phone number</p>
                <p className="text-xs text-blue-500 mt-1">We'll send a 6-digit OTP to your registered number</p>
              </div>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-400 text-sm mb-4"
              />
              <button
                onClick={() => setOtpStep(2)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Send OTP
              </button>
            </div>
          )}

          {otpStep === 2 && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Enter the 6-digit code sent to your phone</p>
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtp(i, e.target.value)}
                    className="w-10 h-12 text-center border-2 border-gray-200 rounded-lg text-lg font-bold outline-none focus:border-blue-500"
                  />
                ))}
              </div>
              <button
                onClick={() => setOtpStep(3)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
              <button
                onClick={() => setOtpStep(1)}
                className="w-full mt-2 text-sm text-gray-500 hover:text-blue-600"
              >
                ← Back
              </button>
            </div>
          )}

          {otpStep === 3 && (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-green-600 text-lg">2FA Enabled!</p>
              <p className="text-sm text-gray-400 mt-1">Your account is now more secure</p>
              <button
                onClick={() => { setOtpStep(1); setOtp(['', '', '', '', '', '']); }}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Reset 2FA
              </button>
            </div>
          )}
        </div>

        {/* Role Based UI */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Role-Based Access Control</h3>
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setRole('entrepreneur')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${role === 'entrepreneur' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Entrepreneur View
            </button>
            <button
              onClick={() => setRole('investor')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${role === 'investor' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Investor View
            </button>
          </div>

          {role === 'entrepreneur' ? (
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'My Startup Profile', access: true },
                { label: 'Find Investors', access: true },
                { label: 'Upload Documents', access: true },
                { label: 'View Deals', access: true },
                { label: 'Manage Portfolio', access: false },
                { label: 'Fund Startups', access: false },
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-lg border flex items-center gap-2 ${item.access ? 'border-green-200 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                  {item.access
                    ? <CheckCircle size={16} className="text-green-500" />
                    : <XCircle size={16} className="text-red-400" />}
                  <span className={`text-sm font-medium ${item.access ? 'text-green-700' : 'text-red-400'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'My Portfolio', access: true },
                { label: 'Find Startups', access: true },
                { label: 'Fund Deals', access: true },
                { label: 'View Documents', access: true },
                { label: 'Edit Startup Profile', access: false },
                { label: 'Request Funding', access: false },
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-lg border flex items-center gap-2 ${item.access ? 'border-green-200 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                  {item.access
                    ? <CheckCircle size={16} className="text-green-500" />
                    : <XCircle size={16} className="text-red-400" />}
                  <span className={`text-sm font-medium ${item.access ? 'text-green-700' : 'text-red-400'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;    