cp .travis/.env.feature-tests ./.env.local
cypress run --record --spec "cypress/integration/controlOperations.js"