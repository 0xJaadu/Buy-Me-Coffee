/**
 * Connection Status Component
 * Displays the current wallet connection status and provides a button to toggle connection.
 */


// Styling for the connection status button
const btnClasses = 'w-40 px-6 bg-[#FFDD00] py-3 font-bold text-sm tracking-wide uppercase rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-200 ease-out  hover:cursor-pointer'

// Styling when wallet is NOT connected
const disconnectedClasses =(btnClasses +  ' bg-blue-600 text-[#627EEA] font-mono text-black hover:bg-blue-700 hover:shadow-lg  active:scale-95')

// Styling when wallet IS connected
const connectedClasses = (btnClasses +  " bg-[#1E293B] border-[#334155] text-[#627EEA]  hover:border-zinc-500 hover:cursor-pointer hover:bg-[#FACC15] font-mono active:scale-95")

interface defineTypes{
    isConnected: boolean;
    handleConnect: React.MouseEventHandler<HTMLButtonElement>;
}

function IsConnectDisplay({isConnected, handleConnect} : defineTypes){
    return (
        <div id='stats-connected?' className='ml-[85%] pt-10 '>
            <button onClick={handleConnect} className={isConnected ? connectedClasses : disconnectedClasses}>
                {isConnected ? "Connected" : "Not Connected"}
            </button>   
        </div>
    )
}

export default IsConnectDisplay;