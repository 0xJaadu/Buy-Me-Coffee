/**
 * Loading Animation Component
 * Displays a spinning loader SVG while transaction is processing.
 */
function SnakeLoading(){
  return (
    <svg className="animate-spin origin-center absolute h-10 w-10 flex place-self-center" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd" clipRule="evenodd">
        <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" 
              fill="#B48900" 
              opacity="0.2"/>
        <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" 
              fill="#5D5DFF"/>
      </g>
    </svg>
  )
}

export default SnakeLoading;