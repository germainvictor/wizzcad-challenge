import models from '../../models';
import getForm from './getForm';

export default async function updateForm(
  id: number,
  {
    name,
  }: {
    name: string;
  }
) {
  if (!name) {
    throw new Error('Nothing to update');
  }

  await models.form.update(
    {
      name,
    },
    {
      where: { id },
    }
  );

  const form = await getForm({ id });

  return form;
}
