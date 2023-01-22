import models from '../../models';
import { generateMetadata } from '../form/createNewForm';
import { getSectionsData } from '../form/getForm';
import { Metadata } from '../type';

export default async function createSection({
  formId,
  sectionId,
  name,
  metadata,
}: {
  formId?: number;
  sectionId?: number;
  name: string;
  metadata: Metadata[];
}) {
  if (!name) {
    throw new Error('Name for a section is missing');
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
      throw new Error('The section you want to assign to this new section does not exist');
    }
  }

  if (formId) {
    const form = await models.form.findOne({
      where: {
        id: formId,
      },
    });

    if (!form) {
      throw new Error('The form you want to assign to this new section does not exist');
    }
  }

  const section = await models.section.create({
    name,
    formId,
    sectionId,
  });

  // If the section contains metadata then we create its element
  if (metadata && metadata.length) {
    for (const data of metadata) {
      await generateMetadata({ metadata: data, section });
    }

    // We need to refresh the section to get the information it contains
    const sectionReload = await models.section.findOne({
      where: { id: section.id },
      include: [
        {
          required: false,
          model: models.field,
          as: 'fields',
        },
        {
          required: false,
          model: models.section,
          as: 'sections',
        },
      ],
    });

    await getSectionsData(sectionReload.sections, {});

    return sectionReload;
  }

  return section;
}
