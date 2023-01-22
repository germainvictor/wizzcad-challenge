import models from '../../models';

export default async function updateField(
  id: number,
  {
    name,
    required,
    softDeleted,
  }: {
    name: string;
    required: string;
    softDeleted: string;
  }
) {
  if (!name && !required) {
    throw new Error('Nothing to update');
  }

  await models.field.update(
    {
      ...(name ? { name } : {}),
      required: required ? (required === 'true' ? true : false) : false,
      softDeleted: softDeleted ? (softDeleted === 'true' ? true : false) : false,
    },
    {
      where: { id },
    }
  );

  const field = await models.field.findOne({
    where: { id },
  });

  return field;
}
