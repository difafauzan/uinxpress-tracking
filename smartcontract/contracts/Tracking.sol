// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Tracking {
    // Struktur data untuk menyimpan informasi pengiriman
    struct Shipment {
        string trackingNumber; // Nomor resi unik
        string date;       // Tanggal pengiriman
        string status;     // Status pengiriman
        address owner;     // Pemilik data (pengirim)
    }

    // Array untuk menyimpan semua pengiriman
    Shipment[] private shipmentList;

    // Mapping untuk menyimpan data pengiriman berdasarkan trackingNumber
    mapping(string => uint256) private shipmentIndex; // Menyimpan indeks pengiriman di shipmentList

    // Event untuk mencatat pengiriman baru
    event ShipmentAdded(string trackingNumber, string date, string status, address indexed owner);

    // Event untuk mencatat pembaruan status pengiriman
    event ShipmentStatusUpdated(string trackingNumber, string newStatus);

    // Fungsi untuk menambahkan pengiriman baru
    function addShipment(string memory _trackingNumber, string memory _date) public {
        // Validasi: Pastikan trackingNumber belum terdaftar
        require(shipmentIndex[_trackingNumber] == 0, "Tracking ID already exists");

        // Tambahkan pengiriman baru ke array
        shipmentList.push(
            Shipment({
                trackingNumber: _trackingNumber,
                date: _date,
                status: "Pending",
                owner: msg.sender
            })
        );

        // Simpan indeks pengiriman di mapping
        shipmentIndex[_trackingNumber] = shipmentList.length;

        // Emit event
        emit ShipmentAdded(_trackingNumber, _date, "Pending", msg.sender);
    }

    // Fungsi untuk memperbarui status pengiriman
    function updateShipmentStatus(string memory _trackingNumber, string memory _newStatus) public {
        // Validasi: Nomor resi harus sudah terdaftar
        require(shipmentIndex[_trackingNumber] != 0, "Tracking ID does not exist");

        // Dapatkan indeks pengiriman
        uint256 index = shipmentIndex[_trackingNumber] - 1;

        // Validasi: Hanya owner yang dapat memperbarui status
        require(shipmentList[index].owner == msg.sender, "Only the owner can update the status");

        // Perbarui status pengiriman
        shipmentList[index].status = _newStatus;

        // Emit event
        emit ShipmentStatusUpdated(_trackingNumber, _newStatus);
    }

    // Fungsi untuk mencari data pengiriman berdasarkan nomor resi
    function getShipment(string memory _trackingNumber) public view returns (string memory, string memory, string memory, address) {
        // Validasi: Nomor resi harus sudah terdaftar
        require(shipmentIndex[_trackingNumber] != 0, "Tracking ID does not exist");

        // Dapatkan indeks pengiriman
        uint256 index = shipmentIndex[_trackingNumber] - 1;

        // Kembalikan data pengiriman
        Shipment memory shipment = shipmentList[index];
        return (shipment.trackingNumber, shipment.date, shipment.status, shipment.owner);
    }

    // Fungsi untuk mendapatkan semua pengiriman
    function getAllShipments() public view returns (Shipment[] memory) {
        return shipmentList;
    }
}