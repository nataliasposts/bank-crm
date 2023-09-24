import styled from 'styled-components';

const StyledFooter = styled.div({
  maxWidth: '100%',
  padding: '25px 0 25px',
  backgroundColor: 'rgb(33, 33, 33)',
  flex: '0 0 auto',

  '.container': {
    maxWidth: '1170px',
    margin: 'auto',
    padding: '0 15px'
  },
  '.title': {
    fontSize: '15px',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    textTransform: 'capitalize'
  }
});
export default StyledFooter;
