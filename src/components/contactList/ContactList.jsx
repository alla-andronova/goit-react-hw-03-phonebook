import PropTypes from 'prop-types';
import s from './ContactList.module.css';

function ContactList({ contacts, onDeleteClick }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={s.item}>
          {name}: {number}
          <button
            data-id={id}
            type="button"
            onClick={e => onDeleteClick(e)}
            className={s.btn}
          >
            &#10060;
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default ContactList;
