import { create } from "@/actions/create-board";




const OrganizationIdPage = () => {



  return (
    <div>
      <form action={create}>
        <input 
        id="title" 
        name="title" 
        placeholder="Enter a board title" 
        className="boarder-black boarder p-1" 
        required 
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;
