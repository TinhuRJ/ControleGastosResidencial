Controle de Gastos Residencial

Projeto de estudo de Controle de Gastos Residencial, desenvolvido com foco em aprendizado e boas práticas de desenvolvimento full-stack.

Tecnologias utilizadas

Front-end: React + TypeScript

Back-end: .NET 6 (C#)

Banco de dados: SQL Server, utilizando migrations para versionamento e controle do esquema

Gerenciamento de estado e chamadas API: Axios/Serviços dedicados

Estilo: CSS global, componentes simples para CRUD e formulários

Funcionalidades

Cadastro, listagem, edição e exclusão de Categorias

Cadastro, listagem, edição e exclusão de Transações, com validações:

Menores de 18 anos só podem registrar despesas

Tipo da transação valida a categoria automaticamente (despesa/receita)

Relatórios detalhados:

Totais por categoria

Totais por pessoa

Cálculo de saldo, receitas e despesas

Filtros e seleção de usuários e categorias

Estrutura do projeto

BackEnd/ → projeto .NET 6, APIs REST, models, controllers e migrations

FrontEnd/ → projeto React + TypeScript, telas de CRUD, formulários e relatórios

Serviços para consumo das APIs (CategoriaService, TransacaoService, PessoaService)

Observações

Projeto desenvolvido para estudo e prática de full-stack development

Banco de dados utilizado: SQL Server, com migrations para criar e atualizar tabelas

O front-end consome as APIs do back-end via endpoints locais
