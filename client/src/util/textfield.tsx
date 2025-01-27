import {TextfieldProps} from "../types/main";
  
  const Textfield = ({ body , chat }: TextfieldProps) => {
    return (
      <div className="h-fit w-fit mb-20 ml-10 lg:ml-80 flex flex-row max-w-4/5 lg:max-w-2/3 text-sm lg:text-xl">

            <img src= {chat + ".svg"} className="h-15 mt-4 w-15 rounded-4xl"/>

            <div className="bg-white ml-4 rounded-md p-3">
                <h1 className="text-black">
                    {body}
                </h1>
            </div>

      </div>
    );
  };
  
  export default Textfield;
  