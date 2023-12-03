export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="alert alert-error mt-5">
        <div className="flex-1">
          
           <p>Error</p>
       
          <label>{message}</label>
        </div>
      </div>
    );
  }
  