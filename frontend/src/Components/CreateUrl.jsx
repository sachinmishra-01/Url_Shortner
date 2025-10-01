import { useState } from "react";
import { getShortUrlWithoutUser } from "../Apis/shortUrl.api";

function CreateUrl() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) return;
    setLoading(true);

    const payload = { url };

    try {
      const { shortUrl } = await getShortUrlWithoutUser(payload);
      setShortUrl(shortUrl);
    } catch (err) {
      alert(err?.response?.data?.message || "Error creating short URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5000/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Shorten Your URLs
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform long, complex URLs into clean, shareable links instantly. 
            Perfect for social media, emails, and anywhere you need a clean link.
          </p>
        </div>

        {/* Main Tool */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-8 mb-8">
            <div className="space-y-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-white mb-2">Enter Your Long URL</h2>
                  <p className="text-gray-400">Paste any URL below and we'll create a shorter version for you</p>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c0 0 2-2 2-2m-2 2c0 0-2-2-2 2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="https://example.com/very-long-url-that-needs-shortening..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 text-lg bg-gray-900/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    onKeyPress={(e) => e.key === 'Enter' && handleShorten()}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleShorten}
                disabled={loading || !url.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Short URL...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>Shorten URL</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Section */}
          {shortUrl && (
            <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="p-8">
                {/* Success Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Success! Your URL is Ready</h3>
                  <p className="text-gray-400">Your long URL has been shortened and is ready to share</p>
                </div>

                {/* URL Display */}
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Original URL */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-wide">Original URL</label>
                      <p className="text-gray-300 text-sm truncate bg-gray-800/50 rounded-lg px-3 py-2">
                        {url}
                      </p>
                    </div>

                    {/* Short URL */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-emerald-400 uppercase tracking-wide">Shortened URL</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <a
                            href={`http://localhost:5000/${shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-mono text-lg font-bold break-all underline decoration-dotted underline-offset-4 transition-colors"
                          >
                            localhost:5000/{shortUrl}
                          </a>
                        </div>
                        
                        <button
                          onClick={handleCopy}
                          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                            copied 
                              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg" 
                              : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {copied ? (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => {
                      setUrl("");
                      setShortUrl("");
                      setCopied(false);
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Shorten Another URL</span>
                  </button>
                  
                  <a
                    href={`http://localhost:5000/${shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M5 5l14 14" />
                    </svg>
                    <span>Test Link</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default CreateUrl;