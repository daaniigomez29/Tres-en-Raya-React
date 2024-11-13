import PropTypes from "prop-types";

export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index);
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }

  // Validación de los props
Square.propTypes = {
  children: PropTypes.node,  // children debe ser cualquier elemento renderizable
  isSelected: PropTypes.bool, // isSelected debe ser booleano
  updateBoard: PropTypes.func, // updateBoard debe ser una función
  index: PropTypes.number // index debe ser un número
};