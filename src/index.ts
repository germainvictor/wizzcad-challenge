import express from 'express';
import bodyParser from 'body-parser';
import createNewForm from './form/createNewForm';
import getForm from './form/getForm';
import createField from './field/createField';
import { Field, Section } from './type';
import createSection from './section/createSection';
import parseQuery from './parseQuery';
import updateSection from './section/updateSection';
import updateField from './field/updateField';
import updateForm from './form/updateForm';
import deleteForm from './form/deleteForm';

const app = express();

app.use(bodyParser.json());

// Create new form
app.post('/newForm', async (req: any, res) => {
  const form = await createNewForm(req.body);

  res.send(form);
});

// Return form by id
app.get('/form/:id', async (req: any, res) => {
  if (!req.params.id) {
    throw new Error('You need to specify id of form');
  }

  const { softDeleted } = parseQuery(req.query);

  const form = await getForm({ id: req.params.id, softDeleted });

  if (!form) {
    throw new Error('No form found');
  }

  res.send(form);
});

// Return list of all forms
app.get('/forms', async (req: any, res) => {
  const { softDeleted } = parseQuery(req.query);

  const forms = await getForm({ softDeleted });

  if (Array.isArray(forms) && !forms.length) {
    throw new Error('No form found');
  }

  res.send(forms);
});

// Add field to form or section
app.post('/add/field', async (req: any, res) => {
  const { formId, sectionId, type, name, required } = req.body;

  const field: Field = await createField({ formId, sectionId, type, name, required });

  res.send(field);
});

// Add section to form or section
app.post('/add/section', async (req: any, res) => {
  const { formId, sectionId, name, metadata } = req.body;

  const section: Section = await createSection({ formId, sectionId, name, metadata });

  res.send(section);
});

// Update section
// Only the name can be changed
app.post('/update/section/:id', async (req: any, res) => {
  if (!req.params.id) {
    throw new Error('You need to specify id of section');
  }

  const { name, softDeleted } = req.body;

  const section: Section = await updateSection(req.params.id, { name, softDeleted });

  res.send(section);
});

// Update field
// Only the name and required can be changed
app.post('/update/field/:id', async (req: any, res) => {
  if (!req.params.id) {
    throw new Error('You need to specify id of field');
  }

  const { name, required, softDeleted } = req.body;

  const field: Field = await updateField(req.params.id, { name, required, softDeleted });

  res.send(field);
});

// Update form
// Only the name can be changed
app.post('/update/form/:id', async (req: any, res) => {
  if (!req.params.id) {
    throw new Error('You need to specify id of form');
  }

  const { name } = req.body;

  const form = await updateForm(req.params.id, { name });

  res.send(form);
});

// Delete form
app.post('/delete/form/:id', async (req: any, res) => {
  if (!req.params.id) {
    throw new Error('You need to specify id of form');
  }

  try {
    await deleteForm(req.params.id);
  } catch (e: any) {
    throw new Error(e);
  }

  res.send({ status: 200 });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
