import styled from 'styled-components';

const StyledUserPage = styled.div({
  maxWidth: '100%',
  padding: '35px 0 57px 0',
  flex: '1 0 auto',
  '.container': {
    maxWidth: '1170px',
    margin: 'auto',
    padding: '0 15px'
  },
  '.name': {
    fontSize: '24px'
  },
  '.amount': {
    fontSize: '18px',
    alignSelf: 'center'
  },
  '.amount-title': {
    fontWeight: 'bold'
  },
  '.personal-info-row': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '25px'
  },
  '.table': {
    width: '100%',
    borderCollapse: 'collapse'
  },
  '.table-element': {
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd'
  },
  '.header-table-element': {
    background: '#D0D0D0'
  },
  '.button-row': {
    margin: '20px 0 40px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  '.button': {
    cursor: 'pointer',
    border: '1 solid',
    borderRadius: '6px',
    background: 'none',
    padding: '0 15px 0 15px',
    width: '170px'
  },
  '.table-amount': {
    paddingLeft: '15px'
  },
  '.table-info': {
    fontSize: '14px',
    fontWeight: 'normal'
  },
  '.pagination-buttons': {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default StyledUserPage;
