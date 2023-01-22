import models from '../../models';
import getForm from './getForm';
import { Model, Metadata, Form, Section } from '../type';

async function createField({
  metadata,
  form,
  section,
}: {
  metadata: Metadata;
  form?: Form | null;
  section?: Section | null;
}) {
  const { name, required, subType: type } = metadata;

  if (!name) {
    throw new Error('Name for a field is missing');
  }

  if (!type) {
    throw new Error('You need to add the subType for a field');
  }
  await models.field.create({
    type,
    name,
    required: required ? (required === 'true' ? true : false) : false,
    formId: form ? form.id : null,
    sectionId: section ? section.id : null,
  });
}

async function createSection({
  metadata,
  form,
  section,
}: {
  metadata: Metadata;
  form?: Form | null;
  section?: Section | null;
}) {
  const { name, metadata: subMetadata } = metadata;

  if (!name) {
    throw new Error('Name for a section is missing');
  }

  const newSection = await models.section.create({
    name,
    formId: form ? form.id : null,
    sectionId: section ? section.id : null,
  });

  if (!subMetadata?.length) {
    return;
  }

  // If the section contains metadata then we create its element
  for (const metadata of subMetadata) {
    await generateMetadata({ metadata, section: newSection });
  }
}

export async function generateMetadata({
  metadata,
  form,
  section,
}: {
  metadata: Metadata;
  form?: Form;
  section?: Section;
}) {
  if (metadata.type === 'field') {
    await createField({ metadata, section, form });
  }
  if (metadata.type === 'section') {
    await createSection({ metadata, section, form });
  }
}

export default async function createNewForm(model: Model) {
  if (!model.name) {
    throw new Error('You need to add a name to your form');
  }

  const form = await models.form.create({ name: model.name });

  // We loop over each metadata to create them
  if (model.metadata && model.metadata.length) {
    for (const metadata of model.metadata) {
      await generateMetadata({ metadata, form });
    }

    const formRefresh = await getForm({ id: form.id });

    return formRefresh;
  }

  return form;
}
