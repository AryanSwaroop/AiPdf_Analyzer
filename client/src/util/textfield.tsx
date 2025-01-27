import { TextfieldProps } from "../types/main"; // Importing the type definition for props from the main types file

// Functional component definition for Textfield
const Textfield = ({ body, chat }: TextfieldProps) => {
  return (
    // Container for the text field with responsive styles for layout and spacing
    <div className="h-fit w-fit mb-20 ml-10 lg:ml-80 flex flex-row max-w-4/5 lg:max-w-2/3 text-sm lg:text-xl">

      {/* Chat image section */}
      <img 
        src={chat + ".svg"} // Dynamically generates the image source based on the `chat` prop
        className="h-15 mt-4 w-15 rounded-4xl" // Styling the image with dimensions and rounded corners
      />

      {/* Text content container */}
      <div className="bg-white ml-4 rounded-md p-3">
        {/* Displays the body text in black */}
        <h1 className="text-black">
          {body}
        </h1>
      </div>

    </div>
  );
};

export default Textfield; // Exporting the component for use in other parts of the application
