# 🎭 Automação de Testes E2E - Criatório JZS (Playwright)

Este repositório contém a suíte de testes automatizados End-to-End (E2E) desenvolvida com **Playwright** e **TypeScript** para a aplicação **Criatório JZS**. 

O projeto valida as regras de negócio, preenchimento de formulários, validações de campos e máscaras de entrada no Módulo de Lançamentos e Cadastro de Aves.

---

## 🧪 Cobertura dos Testes Automatizados (12 Casos de Teste)

| ID | Caso de Teste | Descrição / Ação | Status |
| :--- | :--- | :--- | :---: |
| **CT-001** | Campos obrigatórios | Valida a indicação visual de campos obrigatórios (*) | ✅ Passed |
| **CT-002** | Salvar registro | Valida o fluxo completo de salvamento de cadastro | ✅ Passed |
| **CT-003** | Upload de Imagem (PNG) | Valida o envio da foto da ave em formato PNG | ✅ Passed |
| **CT-004** | Duplicidade de Anilha | Valida mensagem de erro para anilha já existente | ✅ Passed |
| **CT-005** | Valores Padrão | Valida valores padrão (Nome Comum / Nome Científico) | ✅ Passed |
| **CT-006** | Validação sem Anilha | Valida erro ao tentar salvar formulário sem a Anilha | ✅ Passed |
| **CT-007** | Seleção de Sexo | Valida a seleção das opções de sexo (Macho, Fêmea, Indefinido) | ✅ Passed |
| **CT-008** | Ajuste de Mês | Valida a correção automática para meses maiores que 12 | ✅ Passed |
| **CT-009** | Ajuste de Dia | Valida a correção automática de entradas de dias acima de 31 | ✅ Passed |
| **CT-010** | Formato de Data | Valida o preenchimento de data no formato DD/MM/AAAA | ✅ Passed |
| **CT-011** | Alteração de Status | Valida alteração de status (Ativo, Doado, Falecido, Fugiu) | ✅ Passed |
| **CT-012** | Árvore Genealógica | Valida a expansão do cadastro avançado de parentesco | ✅ Passed |

---

## 🛠️ Tecnologias e Ferramentas

* **Playwright:** Framework de testes automatizados E2E.
* **TypeScript:** Linguagem para desenvolvimento dos scripts de teste.
* **Node.js:** Ambiente de execução.

---

## 🚀 Como Executar os Testes

### Pré-requisitos
* Node.js instalado (versão 18 ou superior)
* Git instalado

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/elennatalisilva/criatorio-jzs-playwright.git](https://github.com/elennatalisilva/criatorio-jzs-playwright.git)
   cd criatorio-jzs-playwright