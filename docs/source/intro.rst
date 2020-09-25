Introduction
=============


Smacco is a tool designed to easily generate "smart accounts" for holding assets 
based on different (and combined) features:

- public/private key validation
- MultiSig
- timelock
- Asset-specific behavior (only allowing withdraws for specific assets, for example)

That will help NEO users to easily create and manage safe account addresses. 
Initially, only json interface will be provided to allow C# code generation (that will become AVM).

.. warning::
    Only Neo2 smart contracts are currently supported. As soon as Neo3 is launched, Smacco can be
    updated to reflect latest changes on asset model, such as UTXO being replaced by Native Contracts.

On Smacco, visual interfaces can also help the design process, 
keeping in mind this tool is NOT only intended for developers, but also to general public.

Smacco is available `online <https://neoresearch.io/smacco>`_. Feel free to try it!


More information
-----------------

If you want to build it locally, visit :doc:`install <../install>`, otherwise you can jump to
:doc:`quick start <../quickstart>` and practice `online <https://neoresearch.io/smacco>`_.

.. role::  raw-html(raw)
    :format: html

Smacco has been developed with :raw-html:`&hearts;` by NeoResearch Community.

Feel free to visit project `GitHub <https://github.com/neoresearch/neo-smacco>`_.

License
-------

Project released under MIT License.

See complete :doc:`license <../license>`.
