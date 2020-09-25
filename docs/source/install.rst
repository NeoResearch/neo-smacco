Installation
=============

Smacco is written on Javascript and published on NPM.
The tool can be used `online <https://neoresearch.io/smacco>`_, so only 
advanced developers are required to install this.


How to install
--------------

Install on web browser

.. code-block:: html

   <script src="https://unpkg.com/neo-smacco/dist/bundle.js"></script>


.. code-block:: js

   Smacco = smacco.Smacco;

Install on npm

.. code-block:: shell

   npm install neo-smacco

.. code-block:: js

   const Smacco = require('neo-smacco').Smacco;


Cloning from GitHub
-------------------

To clone OptFrame repository from GitHub:

.. code-block:: shell

   git clone https://github.com/neoresearch/neo-smacco.git


Development Workflow 
--------------------

Tests

.. code-block:: shell

   npm test

Build Webpack

.. code-block:: shell

   npm run build

New minor version

.. code-block:: shell

   npm version minor


Push and Publish

.. code-block:: shell

   git push origin master --tags
   npm publish

That's it! If you want to try it, jump to `<./quickstart.html>`_.