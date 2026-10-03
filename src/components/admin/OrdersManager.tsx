import React, { useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { OrderLead, OrderStatus } from '../../types';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  X,
  Phone,
  MapPin,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; border: string }> = {
  new: { label: 'New Lead', color: 'text-amber-400', bg: 'bg-amber-950/40', border: 'border-amber-800' },
  contacted: { label: 'Contacted', color: 'text-sky-400', bg: 'bg-sky-950/40', border: 'border-sky-800' },
  paid: { label: 'Paid / Confirmed', color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-800' },
  dispatched: { label: 'Dispatched', color: 'text-purple-400', bg: 'bg-purple-950/40', border: 'border-purple-800' },
  delivered: { label: 'Delivered', color: 'text-green-400', bg: 'bg-green-950/40', border: 'border-green-800' },
  cancelled: { label: 'Cancelled', color: 'text-rose-400', bg: 'bg-rose-950/40', border: 'border-rose-800' },
};

export const OrdersManager: React.FC = () => {
  const { orders, addOrderLead, updateOrderLead, deleteOrderLead, storeSettings } = useCatalog();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingOrder, setEditingOrder] = useState<OrderLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // Form state for creating a manual order
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [manualProduct, setManualProduct] = useState('');
  const [manualAmount, setManualAmount] = useState<number | ''>('');
  const [manualStatus, setManualStatus] = useState<OrderStatus>('new');
  const [manualNotes, setManualNotes] = useState('');

  // Filter orders
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const matchesSearch = 
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone.includes(searchQuery) ||
      ord.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.trackingNumber && ord.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ord.customerLocation && ord.customerLocation.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) return;

    addOrderLead({
      customerName: manualName.trim(),
      customerPhone: manualPhone.trim(),
      customerLocation: manualLocation.trim() || 'India',
      productName: manualProduct.trim() || 'Custom Order',
      amount: manualAmount ? Number(manualAmount) : undefined,
      status: manualStatus,
      notes: manualNotes.trim(),
      source: 'manual',
    });

    // Reset
    setManualName('');
    setManualPhone('');
    setManualLocation('');
    setManualProduct('');
    setManualAmount('');
    setManualNotes('');
    setIsNewLeadModalOpen(false);
  };

  const handleSaveOrderEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    updateOrderLead(editingOrder.id, {
      status: editingOrder.status,
      courierName: editingOrder.courierName,
      trackingNumber: editingOrder.trackingNumber,
      notes: editingOrder.notes,
      amount: editingOrder.amount,
      customerLocation: editingOrder.customerLocation,
    });

    setEditingOrder(null);
  };

  const getWhatsAppChatUrl = (order: OrderLead) => {
    const cleanPhone = order.customerPhone.replace(/\D/g, '');
    let text = `Hi ${order.customerName}! 🏁 Greetings from THE FLYER'S Accessories & Spares.`;

    if (order.status === 'dispatched' && order.trackingNumber) {
      text += `\n\nYour order for *${order.productName}* has been dispatched via *${order.courierName || 'Express Courier'}*!\nTracking AWB: *${order.trackingNumber}*.\nYou can track your shipment online. Let us know if you need anything else!`;
    } else if (order.status === 'paid') {
      text += `\n\nWe have received your payment for *${order.productName}*. Our workshop team is now preparing high-density bubble packing for safe transit!`;
    } else {
      text += `\n\nRegarding your inquiry for: *${order.productName}*.\nHow can we help you complete this order?`;
    }

    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    return `https://wa.me/${fullPhone}?text=${encodeURIComponent(text)}`;
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Location', 'Product', 'Amount', 'Status', 'Courier', 'Tracking No', 'Notes'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerLocation || ''}"`,
      `"${o.productName}"`,
      o.amount || '',
      o.status,
      `"${o.courierName || ''}"`,
      `"${o.trackingNumber || ''}"`,
      `"${(o.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `theflyers_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-tech text-xs">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#111116] border border-neutral-800 p-4 rounded-lg">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, item, AWB..."
            className="w-full pl-9 pr-4 py-2 bg-[#181820] border border-neutral-700 rounded text-neutral-200 text-xs focus:border-[#E8302B] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-2 bg-[#1b1b22] hover:bg-[#252530] border border-neutral-700 rounded text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="px-4 py-2 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase tracking-wider rounded flex items-center gap-1.5 red-glow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Manual Order</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['all', 'new', 'contacted', 'paid', 'dispatched', 'delivered', 'cancelled'].map((st) => {
          const count = st === 'all' 
            ? orders.length 
            : orders.filter(o => o.status === st).length;

          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full uppercase text-[11px] font-bold tracking-wider shrink-0 transition-all ${
                statusFilter === st
                  ? 'bg-[#E8302B] text-white'
                  : 'bg-[#15151b] border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>{st === 'all' ? 'All Leads' : STATUS_CONFIG[st as OrderStatus].label}</span>
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === st ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-[#111116] border border-neutral-800 rounded-lg overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <Clock className="w-10 h-10 mx-auto text-neutral-600 mb-2" />
            <p className="text-sm font-semibold">No orders or leads found</p>
            <p className="text-xs text-neutral-600 mt-1">Try changing your search query or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#16161c] border-b border-neutral-800 text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Date & ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product / Item</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Courier & AWB</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {filteredOrders.map((order) => {
                  const cfg = STATUS_CONFIG[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-[#15151e] transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-mono text-neutral-300 font-bold">{order.id}</div>
                        <div className="text-[10px] text-neutral-500">
                          {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-neutral-500" />
                            <span>{order.customerPhone}</span>
                          </span>
                          {order.customerLocation && (
                            <span className="flex items-center gap-1 text-neutral-500">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate max-w-[120px]">{order.customerLocation}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-neutral-200 font-semibold max-w-xs truncate">
                          {order.productName}
                        </div>
                        {order.notes && (
                          <div className="text-[10px] text-neutral-500 italic max-w-xs truncate mt-0.5">
                            Note: {order.notes}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        {order.amount ? (
                          <span className="font-racing font-bold text-white text-sm">
                            ₹{order.amount.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-neutral-600 italic">Inquiry</span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          {cfg.label}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        {order.trackingNumber ? (
                          <div>
                            <div className="font-bold text-purple-300 flex items-center gap-1">
                              <Truck className="w-3 h-3" />
                              <span>{order.courierName || 'Courier'}</span>
                            </div>
                            <div className="font-mono text-[10px] text-neutral-400">
                              AWB: {order.trackingNumber}
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-600 text-[11px]">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Chat on WhatsApp */}
                          <a
                            href={getWhatsAppChatUrl(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-400 hover:text-white transition-colors"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Quick Edit */}
                          <button
                            onClick={() => setEditingOrder(order)}
                            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                            title="Edit Order Status / Tracking"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Delete lead for ${order.customerName}?`)) {
                                deleteOrderLead(order.id);
                              }
                            }}
                            className="p-1.5 rounded bg-neutral-800 hover:bg-red-950/60 border hover:border-red-800 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg bg-[#111116] border border-neutral-700 p-6 rounded-lg shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-[#E8302B] uppercase font-bold tracking-widest">
                  ORDER FULFILLMENT
                </span>
                <h3 className="text-lg font-racing font-bold text-white uppercase">
                  EDIT ORDER: {editingOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setEditingOrder(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOrderEdit} className="space-y-4">
              <div>
                <label className="block text-neutral-400 uppercase text-[10px] mb-1 font-semibold">
                  Customer Name & Item
                </label>
                <div className="p-2 bg-[#181820] rounded border border-neutral-800 text-neutral-300">
                  <div className="font-bold text-white">{editingOrder.customerName} ({editingOrder.customerPhone})</div>
                  <div className="text-xs text-neutral-400">{editingOrder.productName}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Order Status
                  </label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as OrderStatus })}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="paid">Paid / Confirmed</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={editingOrder.amount || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, amount: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                    placeholder="e.g. 3850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    value={editingOrder.courierName || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, courierName: e.target.value })}
                    placeholder="e.g. DTDC, Professional, Speed Post"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Tracking AWB Number
                  </label>
                  <input
                    type="text"
                    value={editingOrder.trackingNumber || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                    placeholder="e.g. D498214829IN"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Delivery Location / Address
                </label>
                <input
                  type="text"
                  value={editingOrder.customerLocation || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerLocation: e.target.value })}
                  placeholder="e.g. Bangalore, 560001"
                  className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Internal Workshop Notes
                </label>
                <textarea
                  rows={2}
                  value={editingOrder.notes || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                  placeholder="Add customer requirements, bike color, fitment questions..."
                  className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase rounded red-glow"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Manual Lead Modal */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg bg-[#111116] border border-neutral-700 p-6 rounded-lg shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-[#E8302B] uppercase font-bold tracking-widest">
                  OFFLINE / PHONE ORDER
                </span>
                <h3 className="text-lg font-racing font-bold text-white uppercase">
                  LOG NEW CUSTOMER INQUIRY
                </h3>
              </div>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Product / Spare Requested *
                </label>
                <input
                  type="text"
                  required
                  value={manualProduct}
                  onChange={(e) => setManualProduct(e.target.value)}
                  placeholder="e.g. KTM Duke Split Projector LED Headlight"
                  className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Quoted Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 3850"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Initial Status
                  </label>
                  <select
                    value={manualStatus}
                    onChange={(e) => setManualStatus(e.target.value as OrderStatus)}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="paid">Paid</option>
                    <option value="dispatched">Dispatched</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Location / City
                </label>
                <input
                  type="text"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder="e.g. Chennai, Tamil Nadu"
                  className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Customer contacted via Instagram DM / Phone..."
                  className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase rounded red-glow"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
