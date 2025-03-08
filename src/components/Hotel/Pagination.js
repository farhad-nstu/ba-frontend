const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => onPageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  