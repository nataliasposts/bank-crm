import { Link } from 'react-router-dom';
import TextEnum from 'src/types/enum/TextEnum';
import StyledHeader from './StyledHeader';

const Header: React.FC = () => {
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
