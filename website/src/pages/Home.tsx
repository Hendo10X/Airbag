import AirbagLogo from '../images/Airbaglogo.svg';
import AxiosLogo from '../images/Axios.svg';
import NextLogo from '../images/Nextjs.svg';
import NodeLogo from '../images/Node.svg';
import TanstackLogo from '../images/Tanstack.svg';
import VueLogo from '../images/Vue.svg';
import SvelteLogo from '../images/svelte.svg';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/ui/CodeBlock';
import Footer from '../components/layout/Footer';

const boilerplateCode = `// The Boilerplate Nightmare
const handleSubmit = async () => {
  setIsLoading(true);
  setError(null);
  try {
    await saveUser(data);
    toast.success("Saved!");
    closeModal();
  } catch (err) {
    console.error(err);
    setError(err.message);
    toast.error("Failed to save.");
  } finally {
    setIsLoading(false);
  }
};`;

const airbagCode = `// The Airbag Way
import { airbag } from 'airbag';

const handleSubmit = airbag(saveUser, {
  loading: 'spinner', // Auto-trigger your spinner
  success: 'toast',   // Auto-trigger success toast
  error: 'dialog',    // Auto-trigger error dialog
  retry: 3            // Retry 3 times on network fail
});`;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-start gap-4 md:gap-8 max-w-4xl mx-auto w-full py-6 md:py-20">
           {/* Header / Logo */}
          <header className="flex items-center gap-2">
            <img src={AirbagLogo} alt="Airbag Logo" className="w-16 h-16 md:w-20 md:h-20" />
          </header>

          <main className="w-full space-y-4 md:space-y-8">
            <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl leading-none text-gray-800 tracking-tight text-left max-w-3xl">
              Stop writing <br />
              try-catch blocks.
            </h1>

            <p className="font-mono text-base sm:text-lg text-gray-600 max-w-xl text-left leading-relaxed">
              Airbag is the execution wrapper that gives your functions instant loading states, 
              smart error handling, and UI feedback. Crash-proof your code in one line.
            </p>

            <div className="flex flex-row gap-4 pt-4 w-full sm:w-auto">
              <button className="bg-[#1a1a1a] text-white font-mono px-4 sm:px-6 py-3 rounded text-sm sm:text-base hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
                <span>npm install airbag</span>
              </button>
              
              <Link to="/docs" className="bg-[#F5F3FF] text-gray-800 font-pixel px-5 sm:px-8 py-3 rounded text-sm sm:text-base hover:bg-[#EDE9FE] transition-colors cursor-pointer border border-transparent hover:border-purple-100 flex items-center justify-center font-medium no-underline whitespace-nowrap">
                View the Docs
              </Link>
            </div>
          </main>
        </section>

        {/* The "Aha!" Moment Section */}
        <section className="w-full max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h2 className="font-pixel text-3xl md:text-4xl text-gray-800">The "Aha!" Moment</h2>
            <p className="font-mono text-gray-600 text-sm md:text-base">the old spaghetti code vs the Airbag way</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300 h-full">
               <CodeBlock code={boilerplateCode} lang="typescript" className="h-full" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg transform rotate-[1deg] hover:rotate-0 transition-transform duration-300 h-full">
               <CodeBlock code={airbagCode} lang="typescript" className="h-full" />
            </div>
          </div>
        </section>

        {/* What's under the hood? Section */}
        <section className="w-full max-w-6xl mx-auto space-y-12 pt-12 pb-24">
          <h2 className="font-pixel text-3xl md:text-4xl text-gray-800 text-opacity-60">What's under the hood?</h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {/* Item 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#bef264] flex items-center justify-center text-xl font-mono text-black font-bold">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-pixel text-gray-400 text-xl tracking-wide">The Crash Pad</h3>
                <p className="font-mono text-gray-800 leading-relaxed text-sm">
                  Define global error policies. Critical errors trigger modals; 
                  minor errors trigger toasts. You set the rules; Airbag enforces them.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#bef264] flex items-center justify-center text-xl font-mono text-black font-bold">
                2
              </div>
              <div className="space-y-2">
                <h3 className="font-pixel text-gray-400 text-xl tracking-wide">Timeout Enforcer</h3>
                <p className="font-mono text-gray-800 leading-relaxed text-sm">
                  Prevent zombie loading states. If a function hangs for 10s, 
                  Airbag kills it and alerts the user automatically.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#bef264] flex items-center justify-center text-xl font-mono text-black font-bold">
                3
              </div>
              <div className="space-y-2">
                <h3 className="font-pixel text-gray-400 text-xl tracking-wide">Silent Mode</h3>
                <p className="font-mono text-gray-800 leading-relaxed text-sm">
                  Need to run background syncs? Toggle silent: true to suppress UI 
                  but keep the logging and retry logic active.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#bef264] flex items-center justify-center text-xl font-mono text-black font-bold">
                4
              </div>
              <div className="space-y-2">
                <h3 className="font-pixel text-gray-400 text-xl tracking-wide">Telemetry Ready</h3>
                <p className="font-mono text-gray-800 leading-relaxed text-sm">
                  Automatically pipe error logs to Sentry or Datadog with zero extra 
                  code. Airbag captures the context, args, and stack trace for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Works with everything Section */}
        <section className="w-full max-w-6xl mx-auto space-y-12 pt-12 pb-24">
          <h2 className="font-pixel text-3xl md:text-4xl text-gray-800 text-opacity-60 text-left">Works with everything you already use</h2>
          
          <div className="flex flex-nowrap justify-start sm:justify-between w-full items-center grayscale hover:grayscale-0 transition-all duration-300 gap-8 overflow-x-auto pb-4">
             <img src={NextLogo} alt="Next.js" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity shrink-0" />
             <img src={TanstackLogo} alt="Tanstack" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity shrink-0" />
             <img src={AxiosLogo} alt="Axios" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity shrink-0" />
             <img src={VueLogo} alt="Vue" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity shrink-0" />
             <img src={SvelteLogo} alt="Svelte" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity shrink-0" />
             <img src={NodeLogo} alt="Node.js" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity shrink-0" />
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
