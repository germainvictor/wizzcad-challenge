import models from '../../models';

export default async function deleteForm(id: number) {
  if (!id) {
    throw new Error('You must provide id');
  }

  const form = await models.form.finOne({ where: { id } });

  if (!form) {
    throw new Error('The form you want to delete does not exist');
  }

  await models.form.destroy({
    where: { id },
  });
}
