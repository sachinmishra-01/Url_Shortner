import axios from "axios";
import { useEffect, useState } from "react";
import { getAllUrls, getShortUrl } from "../Apis/shortUrl.api";
import { useSelector, useDispatch } from "react-redux";
import { setAllUrls, loginSuccess } from "../Store/Slices/authSlice";
import { loginUser } from "../Apis/userAuth.api";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { isAuthenticated, allUrls, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleUrls = async () => {
      const urls = await getAllUrls();
      dispatch(setAllUrls(urls));
    };

    handleUrls();
  }, [dispatch, allUrls]);

  const handleShorten = async () => {
    if (!url.trim()) return;
    setLoading(true);

    const payload = { url, customUrl };

    try {
      const { shortUrl } = await getShortUrl(payload);
      setShortUrl(shortUrl);
    } catch (err) {
      alert(err?.response?.data?.message || "Error creating short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            URL Shortener
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your long URLs into clean, shareable links with advanced analytics and custom domains
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8 mb-8">
            <div className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Original URL</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://example.com/very-long-url..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-4 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Custom URL Input for authenticated users */}
              {isAuthenticated && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Custom Short URL (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      localhost:5000/
                    </span>
                    <input
                      type="text"
                      placeholder="my-custom-url"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full p-4 pl-28 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* Shorten Button */}
              <button
                onClick={handleShorten}
                disabled={loading || !url.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>Shorten URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Card */}
          {shortUrl && (
            <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-emerald-400 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">URL shortened successfully!</span>
                </div>
                
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                      href={`http://localhost:5000/${shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-lg font-medium underline decoration-dotted underline-offset-4 break-all transition-colors"
                    >
                      localhost:5000/{shortUrl}
                    </a>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:5000/${shortUrl}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        copied 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                      }`}
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* URLs History */}
          {allUrls.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Your Shortened URLs</h3>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                  {allUrls.length} URLs
                </span>
              </div>
              
              <div className="grid gap-4">
                {allUrls.map((url, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/30 border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-200 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <a
                            href={`http://localhost:5000/${url.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-mono font-medium text-lg underline decoration-dotted underline-offset-4 transition-colors"
                          >
                            localhost:5000/{url.shortUrl}
                          </a>
                          <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M5 5l14 14" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm truncate max-w-lg">
                          {url.originalUrl}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:5000/${url.shortUrl}`);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;