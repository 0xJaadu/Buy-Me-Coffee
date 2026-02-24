

//interfaces for props:
interface defineTypes{
  cupClicked: 0 | 1 | 2 | 3;
  setCupClicked:React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>;
}

export default function CupsButtons({cupClicked, setCupClicked} : defineTypes){

    //default button classes
    const cardBase = "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer w-full max-w-[120px]"
    
    
    // Styling for selected/highlighted coffee card
    const cardSelected = "border-yellow-400 bg-yellow-400/10 scale-105 shadow-[0_0_15px_rgba(250,204,21,0.2)] " + cardBase;
    
    // Styling for unselected coffee cards
    const cupsClasses = "border-slate-700 bg-slate-800/40 hover:border-slate-500 text-slate-400 " + cardBase;

return(<div id='coffee-selection' className='flex flex-row items-center gap-6 justify-center pt-20 px-10'>
  
            <div onClick={() => setCupClicked(1)} className={cupClicked === 1 ? cardSelected : cupsClasses}>
              <span className="text-3xl mb-2">☕</span>
              <p className="text-sm font-semibold text-white">1 Cup</p>
              <p className="text-xs opacity-70">(0.001 ETH)</p>
            </div>

            <div onClick={() => setCupClicked(2)} className={cupClicked === 2 ? cardSelected : cupsClasses}>
              <span className="text-3xl mb-2">☕☕☕</span>
              <p className="text-sm font-semibold text-white">3 Cups</p>
              <p className="text-xs opacity-70">(0.003 ETH)</p>
            </div>

            <div onClick={() => setCupClicked(3)} className={cupClicked === 3 ? cardSelected : cupsClasses}>
              <span className="text-3xl mb-2">☕☕☕☕☕</span>
              <p className="text-sm font-semibold text-white">5 Cups</p>
              <p className="text-xs opacity-70">(0.005 ETH)</p>
            </div>

          </div>)
}