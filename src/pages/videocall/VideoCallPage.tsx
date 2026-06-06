import { useState } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Monitor, Users, MessageCircle
} from 'lucide-react';

const VideoCallPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Video Calls</h1>
      <p className="text-gray-500 mb-6">Connect with investors and entrepreneurs face to face</p>

      {!callActive ? (
        /* PRE-CALL SCREEN */
        <div className="grid grid-cols-3 gap-6">
          {/* Contacts */}
          <div className="col-span-1 bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-4">Recent Contacts</h3>
            {[
              { name: 'Michael Rodriguez', role: 'Investor', avatar: 'MR', online: true },
              { name: 'Jennifer Lee', role: 'Investor', avatar: 'JL', online: true },
              { name: 'Robert Torres', role: 'Investor', avatar: 'RT', online: false },
            ].map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg mb-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {contact.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.online ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-gray-400">{contact.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCallActive(true)}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Video size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Camera Preview</h3>
            <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-6 relative">
              <div className="text-center text-white">
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold">SJ</span>
                </div>
                <p className="text-lg font-medium">Sarah Johnson</p>
                <p className="text-gray-400 text-sm">Camera ready</p>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setVideoOn(!videoOn)}
                  className={`p-2 rounded-full ${videoOn ? 'bg-gray-700' : 'bg-red-500'} text-white`}
                >
                  {videoOn ? <Video size={16} /> : <VideoOff size={16} />}
                </button>
                <button
                  onClick={() => setAudioOn(!audioOn)}
                  className={`p-2 rounded-full ${audioOn ? 'bg-gray-700' : 'bg-red-500'} text-white`}
                >
                  {audioOn ? <Mic size={16} /> : <MicOff size={16} />}
                </button>
              </div>
            </div>
            <button
              onClick={() => setCallActive(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Video size={20} />
              Start New Call
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE CALL SCREEN */
        <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '70vh' }}>
          {/* Videos */}
          <div className="relative h-full">
            {/* Remote video */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold">MR</span>
                </div>
                <p className="text-xl font-medium">Michael Rodriguez</p>
                <p className="text-green-400 text-sm mt-1">● Connected</p>
              </div>
            </div>

            {/* Local video (small) */}
            <div className="absolute top-4 right-4 w-40 h-28 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-gray-600">
              <div className="text-center text-white">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-1">
                  <span className="text-sm font-bold">SJ</span>
                </div>
                <p className="text-xs">You</p>
              </div>
            </div>

            {/* Call duration */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              ● 00:03:24
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
              <button
                onClick={() => setAudioOn(!audioOn)}
                className={`p-4 rounded-full ${audioOn ? 'bg-gray-700' : 'bg-red-500'} text-white hover:opacity-90 transition`}
                title={audioOn ? 'Mute' : 'Unmute'}
              >
                {audioOn ? <Mic size={22} /> : <MicOff size={22} />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-4 rounded-full ${videoOn ? 'bg-gray-700' : 'bg-red-500'} text-white hover:opacity-90 transition`}
                title={videoOn ? 'Stop Video' : 'Start Video'}
              >
                {videoOn ? <Video size={22} /> : <VideoOff size={22} />}
              </button>
              <button
                onClick={() => setScreenShare(!screenShare)}
                className={`p-4 rounded-full ${screenShare ? 'bg-blue-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
                title="Screen Share"
              >
                <Monitor size={22} />
              </button>
              <button
                className="p-4 rounded-full bg-gray-700 text-white hover:opacity-90 transition"
                title="Participants"
              >
                <Users size={22} />
              </button>
              <button
                className="p-4 rounded-full bg-gray-700 text-white hover:opacity-90 transition"
                title="Chat"
              >
                <MessageCircle size={22} />
              </button>
              <button
                onClick={() => setCallActive(false)}
                className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                title="End Call"
              >
                <PhoneOff size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;