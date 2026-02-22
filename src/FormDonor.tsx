
/**
 * 
 * @param {string} descriptionRef
 * @param {string} nameRef 
 */

//interface to define the data type and possible value
interface FormDonorInterface{
    descriptionRef: React.RefObject<HTMLTextAreaElement | null>;
    nameRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function FormDonor({descriptionRef, nameRef}:FormDonorInterface){

    return(<form className=' w-full max-w-md mt-10 flex flex-col place-self-center gap-6 px-10'>
            {/* Name input field */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm ml-1">Name</label>
              <input name='name-input' ref={nameRef} 
                className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-yellow-400 outline-none transition-all" 
                placeholder='Joe Amderson (Optional)'
              />
            </div>

            {/* Optional message/description field */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm ml-1">Description</label>
              <textarea name='message-input' ref={descriptionRef} 
                className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-yellow-400 outline-none transition-all h-24 resize-none" 
                placeholder='Say something nice...'
              />
            </div>
          </form>)
}