export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white bg-opacity-20 rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-white bg-opacity-10 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
