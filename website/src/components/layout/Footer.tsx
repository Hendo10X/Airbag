import AirbagLogo from '../../images/Airbaglogo.svg';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={AirbagLogo} alt="Airbag Logo" className="w-20 h-20 opacity-80" />
        </div>
        <p className="text-sm text-gray-400">
          Execution Orchestration for JavaScript &middot; MIT License
        </p>
      </div>
     </footer>
  )
}
