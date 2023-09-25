import styled from 'styled-components';

const StyledHeader = styled.div({
  maxWidth: '100%',
  zIndex: '11',
  boxShadow: '0 0 10px rgb(0 0 0 / 10%)',
  position: 'relative',
  '.container': {
    maxWidth: '1170px',
    margin: 'auto',
    padding: '0 15px'
  },
  '.heder-text': {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'black'
  }
});
export default StyledHeader;
