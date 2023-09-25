import { Link } from 'react-router-dom';
import StyledHeader from './StyledHeader';
import TextEnum from '../../types/enum/TextEnum';

const Header = () => {
  return (
    <StyledHeader>
      <div className="container">
        <Link to="/" className="heder-text">
          <p>{TextEnum.MAIN}</p>
        </Link>
      </div>
    </StyledHeader>
  );
};
export default Header;
