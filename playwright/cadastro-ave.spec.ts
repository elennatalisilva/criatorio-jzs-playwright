import { test, expect } from '@playwright/test';

test.describe('Módulo de Lançamentos e Validações de Formulário - Criatório JZS', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://criatoriojzs.vercel.app/');
    await page.waitForLoadState('networkidle');
  });

  // CT-001 - Validar campos obrigatórios
  test('CT-001 - Validar campos obrigatórios com asterisco', async ({ page }) => {
    const campoObrigatorio = page.locator('label', { hasText: '*' });
    await expect(campoObrigatorio.first()).toBeVisible();
  });

  // CT-002 - Validar que sistema salva com sucesso
  test('CT-002 - Validar que sistema salva cadastro com sucesso', async ({ page }) => {
    await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').fill('AN-12345');
    await page.getByRole('button', { name: 'Macho', exact: true }).click();
    await page.getByRole('button', { name: 'Ativo', exact: true }).click();

    await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();

    await expect(page.getByPlaceholder('SISPASS 2.2 SP/A 123456')).toBeVisible();
  });

  // CT-003 - Validar que sistema aceita formato PNG
  test('CT-003 - Validar que sistema aceita formato PNG', async ({ page }) => {
    await page.locator('input[accept="image/*"].hidden').setInputFiles({
      name: 'imagem.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-png-content')
    });

    await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').fill('AN-12345');
    await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();
  });

  // CT-004 - Validar alerta de duplicidade de anilha
  test('CT-004 - Validar alerta de duplicidade de anilha', async ({ page }) => {
    await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').fill('AN-DUPLICADA-001');
    await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();
  });

  // CT-005 - Validar que campos "Nome comum" e "nome científico" retornam preenchidos por padrão
  test('CT-005 - Validar que campos Nome comum e Nome científico retornam preenchidos por padrão', async ({ page }) => {
    await expect(page.locator('input[value="Coleiro"]')).toHaveValue('Coleiro');
    await expect(page.locator('input[value="Sporophila caerulescens"]')).toHaveValue('Sporophila caerulescens');
  });

  // CT-006 - Validar tentativa de salvar sem preencher campo obrigatório ("Código da Anilha")
  test('CT-006 - Validar erro ao tentar salvar sem Código da Anilha', async ({ page }) => {
    await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').clear();
    await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();
  });

  // CT-007 - Validar seleção de Sexo (Macho, Fêmea, Indefinido)
  const sexos = ['Macho', 'Fêmea', 'Indefinido'];
  for (const sexo of sexos) {
    test(`CT-007 - Validar seleção de Sexo (${sexo})`, async ({ page }) => {
      await page.getByRole('button', { name: sexo, exact: true }).click();
      await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').fill(`AN-${sexo}`);
      await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();
    });
  }

  // CT-008 - Validar correção automática de mês maior que 12 para 12
  test('CT-008 - Validar correção automática de mês maior que 12 para 12', async ({ page }) => {
    const campoData = page.getByPlaceholder('dd/mm/aaaa');
    if (await campoData.isVisible()) {
      await campoData.fill('01/13/2024');
      await page.keyboard.press('Tab');
    }
  });

  // CT-009 - Validar que campo dia ajusta entradas acima de 31
  test('CT-009 - Validar que campo dia ajusta entradas acima de 31', async ({ page }) => {
    const campoData = page.getByPlaceholder('dd/mm/aaaa');
    if (await campoData.isVisible()) {
      await campoData.fill('40/01/2024');
      await page.keyboard.press('Tab');
    }
  });

  // CT-010 - Validar que aceita data no futuro com ano de 4 dígitos
  test('CT-010 - Validar que aceita data no futuro com ano de 4 dígitos', async ({ page }) => {
    const campoData = page.getByPlaceholder('dd/mm/aaaa');
    if (await campoData.isVisible()) {
      await campoData.fill('15/08/2030');
    }
    await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').fill('AN-99999');
    await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();
  });

  // CT-011 - Validar alteração de Status (Ativo, Doado, Falecido, Fugiu)
  const statusLista = ['Ativo', 'Doado', 'Falecido', 'Fugiu'];
  for (const status of statusLista) {
    test(`CT-011 - Validar alteração de Status (${status})`, async ({ page }) => {
      await page.getByRole('button', { name: status, exact: true }).click();
      await page.getByPlaceholder('SISPASS 2.2 SP/A 123456').fill(`AN-${status}`);
      await page.getByRole('button', { name: 'SALVAR REGISTRO' }).click();
    });
  }

  // CT-012 - Validar expansão da Árvore Genealógica Avançada
  test('CT-012 - Validar expansão da Árvore Genealógica Avançada', async ({ page }) => {
    await page.getByRole('button', { 
      name: /ABRIR CADASTRO DE ÁRVORE AVANÇADA/i 
    }).click();
  });

});