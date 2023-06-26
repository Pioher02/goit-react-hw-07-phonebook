import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { updateFilter } from '../redux/filter/slice';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, addContact, deleteContact } from '../redux/operations';
import { Dna } from 'react-loader-spinner';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const { isLoading, error } = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //Guarda contacto nuevo
  const saveContact = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;

    let validation = contacts.find(el =>
      el.name
        .toLocaleLowerCase()
        .includes(form.elements.name.value.toLocaleLowerCase())
    );
    if (validation === undefined) {
      dispatch(
        addContact({
          name: form.elements.name.value,
          number: form.elements.number.value,
        })
      );
      form.reset();
    } else {
      Notiflix.Notify.failure(validation.name + 'is already in contacts');
      form.reset();
    }
  };

  const filterContact = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  //Borrar contacto
  const handleDeleteContacts = id => {
    dispatch(deleteContact(id));
    // dispatch(fetchContacts());
  };

  return (
    <>
      <ContactForm saveContact={saveContact}></ContactForm>
      <h1>Contacts</h1>
      <Filter filterContact={filterContact}></Filter>
      <ContactList
        contacts={contacts}
        filter={filter.value}
        deleteContact={handleDeleteContacts}
      />
      {isLoading && !error && (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}
    </>
  );
};

export default App;
