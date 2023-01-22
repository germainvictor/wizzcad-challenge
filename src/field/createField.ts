import models from '../../models';

export default async function createField({
  formId,
  sectionId,
  type,
  name,
  required,
}: {
  formId: number;
  sectionId: number;
  type: string;
  name: string;
  required: string;
}) {
  if (!name) {
    throw new Error('Name for a field is missing');
  }

  if (!type) {
    throw new Error('You need to add the subType for a field');
  }

  if (!sectionId && !formId) {
    throw new Error('You need to specify sectionId or formId');
  }

  if (sectionId && formId) {
    throw new Error('You cannot assign a formId and a sectionId');
  }

  if (sectionId) {
    const section = await models.section.findOne({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new Error('The section you want to assign to this new field does not exist');
    }
  }

  if (formId) {
    const form = await models.form.findOne({
      where: {
        id: formId,
      },
    });

    if (!form) {
      throw new Error('The form you want to assign to this new field does not exist');
    }
  }

  return await models.field.create({
    type,
    name,
    required: required ? (required === 'true' ? true : false) : false,
    formId,
    sectionId,
  });
}
