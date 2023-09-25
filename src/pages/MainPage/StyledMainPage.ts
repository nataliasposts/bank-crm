import styled from 'styled-components';

const StyledMainPage = styled.div({
  maxWidth: '100%',
  padding: '80px 0 75px 0',
  flex: '1 0 auto',
  '.container': {
    maxWidth: '1170px',
    margin: 'auto',
    padding: '0 15px'
  },
  '.row': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  '.table': {
    width: '100%',
    borderCollapse: 'collapse'
  },
  '.table-element': {
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd',
    width: '100%'
  },
  '.header-table-element': {
    background: '#D0D0D0'
  },
  '.click': {
    cursor: 'pointer'
  },
  '.user-info': {
    fontSize: '14px',
    fontWeight: 'normal'
  }
});
export default StyledMainPage;
