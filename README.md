# Que Boi É Teu?

Atividade desenvolvida durante a disciplina de Inteligência Artificial no IFAM Campus Parintins. O projeto “Que Boi É Teu?” consiste em uma aplicação capaz de classificar imagens relacionadas aos bois-bumbás Caprichoso e Garantido por meio de técnicas de Inteligência Artificial.

Para isso, foi desenvolvido um modelo de classificação de imagens baseado em uma Rede Neural Convolucional (CNN), responsável pela identificação da categoria a partir das características visuais da imagem. A aplicação mobile foi desenvolvida utilizando React Native, enquanto o processamento e a comunicação com o modelo de classificação são realizados por meio de um servidor desenvolvido com FastAPI.

## Como executar o projeto?

### Desenvolvimento do Modelo

Você não precisa treinar novamente o modelo. Embora o código utilizado para tal tenha sido disponibilizado, optei por manter o dataset utilizado privado.

### Executando o servidor back-end

Para executar o servidor back-end, acesse o diretório backend a partir da raiz do projeto e crie um ambiente virtual.

```
cd backend
python -m venv .venv
```

Com o ambiente virtual atividado, instale as dependências necessárias.

```
.venv\Scripts\activate

pip install requirements.txt
```

Por fim, coloque o servidor no ar.

```
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Executando a aplicação React Native

Acesse o repositório app-boi e instale as dependências necessárias

```
cd app-boi
npm install
```

Crie um arquivo .env e preencha-o conforme o exemplo, utilizando seu IP público.

```
EXPO_PUBLIC_API_URL=SEU_IP:8000
```

Tenha o aplicativo Expo GO instalado no celular. Execute o comando abaixo no terminal e escaneie o QR Code a partir do Expo Go. É importante que seu celular e computador estejam conectados na mesma rede wi-fi.

```
npx expo start
```
